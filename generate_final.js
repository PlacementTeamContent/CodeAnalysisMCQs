import fs from "fs";
import { v4 } from "uuid";
import { google } from "googleapis";
import open from "open";
import dotenv from "dotenv";

dotenv.config();

const parent_json_file_name = process.env.PARENT_JSON_FILE_NAME;
const questions_response_path = "./responses_json/" + parent_json_file_name + "_responses.json";
const final_responses_path = "./final_responses/" + parent_json_file_name + "_final_responses.json";
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_KEYFILE_PATH = process.env.GOOGLE_KEYFILE_PATH;

const readFileAsync = async (file, options) =>
    await new Promise((resolve, reject) => {
        fs.readFile(file, options, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });

async function getPromptResponses() {
    try {
        const questions_prompts = await readFileAsync(questions_response_path, "utf8");
        return JSON.parse(questions_prompts);
    } catch (error) {
        console.error("Error reading question prompts:", error);
        throw error;
    }
}

const difficulty_level = {
    "0": "EASY",
    "1": "MEDIUM",
    "2": "HARD"
};

const extractQuestionsData = (prompt_responses) => {
    let final_json_sheet = [];

    prompt_responses.forEach((prompt_response, index) => {
        // let tagNames = "";
        // const language_obj = {
        //     "REACT": "NODE_JS",
        //     "JS": "NODE_JS",
        //     "NODE": "NODE_JS",
        //     "PYTHON": "PYTHON",
        //     "JAVA": "JAVA",
        //     "HTML": "HTML",
        //     "CSS": "CSS"
        // };
        // const topic = prompt_response["topic_tag"].toUpperCase();
        const parent_sub_topic = prompt_response["sub_topic_tag"].toUpperCase();
        const startIndex = prompt_response["prompt_response"].indexOf("[");
        const endIndex = prompt_response["prompt_response"].lastIndexOf("]");
        const prompt_response_json = JSON.parse(prompt_response["prompt_response"].slice(startIndex, endIndex + 1));
        // const poolTag = "POOL_1";
        // tagNames = poolTag + "\n";
        // const topicTag = "TOPIC_" + topic;
        // tagNames += topicTag + "\n";

        // tagNames += subTopicTag + "\n";
        // const difficultyTag = "DIFFICULTY_" + prompt_response["difficulty_level_tag"].toUpperCase();
        // tagNames += difficultyTag + "\n";
        // const sourceTag = "SOURCE_GPT";
        // tagNames += sourceTag + "\n";
        // const offlineTag = "IN_OFFLINE_EXAM";
        // tagNames += offlineTag + "\n";
        // const companyTag = "COMPANY_UNKNOWN";
        // tagNames += companyTag + "\n";

        prompt_response_json.forEach(response => {
            let question_data = {};
            let wrong_options = [];
            let correct_option = "";
            let c = 0;
            Object.keys(response["options"]).forEach(option => {
                if (response["options"][option] === "FALSE") {
                    wrong_options.push(option);
                    c = c + 1;
                } else {

                    c = c + 1;
                    if (c == 1)
                        correct_option = "Option A";
                    else if (c == 2)
                        correct_option = "Option B";
                    else if (c == 3)
                        correct_option = "Option C";
                    else
                        correct_option = "Option D";
                    wrong_options.push(option);

                }
            });

            //   question_data["question_id"] = v4();
            //   question_data["question_type"] = "CODE_ANALYSIS_MULTIPLE_CHOICE";
            //   question_data["short_text"] = "";
            let code = response["code_data"] ? "\n\n```sql\n" + response["code_data"] + "```" : "";
            question_data["Question"] = response["question_text"] + code;
            //   question_data["question_key"] = index;
            //   question_data["content_type"] = "HTML";
            //   question_data["multimedia_count"] = 0;
            //   question_data["multimedia_format"] = "";
            //   question_data["multimedia_url"] = "";
            //   question_data["thumbnail_url"] = "";
            // question_data["tag_names"] = tagNames + question_data["question_id"];
            question_data["OptionA"] = wrong_options[0];
            question_data["OptionB"] = wrong_options[1];
            question_data["OptionC"] = wrong_options[2];
            question_data["OptionD"] = wrong_options[3];
            question_data["Answer"] = correct_option;
            const subTopicTag = parent_sub_topic.replaceAll(" ", "_");
            question_data["Sub_topic"] = subTopicTag;
            // question_data["w_options"] = wrong_options;
            // question_data["options_content_type"] = "TEXT";
            // question_data["code_data"] = response["code_data"];
            // question_data["code_language"] = language_obj[topic];

            if (response["difficulty_level"] == 0)
                question_data["toughness"] = "EASY";
            else if (response["difficulty_level"] == 1)
                question_data["toughness"] = "MEDIUM";
            else
                question_data["toughness"] = "HARD";

            question_data["explanation"] = response["answer_explanation_content"];

            final_json_sheet.push(question_data);
        });
    });

    console.log("\nWriting into file\n");
    const jsonData = JSON.stringify(final_json_sheet);
    fs.writeFile(final_responses_path, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('An error occurred while writing the file:', err);
            return;
        }
        console.log('JSON file has been created successfully!');
    });

    return final_json_sheet;
}

async function createNewSheet(auth) {
    const sheets = google.sheets({ version: "v4", auth });

    const request = {
        spreadsheetId: GOOGLE_SHEET_ID,
        resource: {
            requests: [{
                addSheet: {
                    properties: {
                        title: `Responses ${new Date().toLocaleDateString()}`,
                    }
                }
            }]
        }
    };

    try {
        const response = await sheets.spreadsheets.batchUpdate(request);
        const newSheetId = response.data.replies[0].addSheet.properties.sheetId;
        console.log("New sheet created with ID:", newSheetId);
        return newSheetId;
    } catch (error) {
        console.error("Error creating new sheet:", error);
        throw error;
    }
}

async function saveResponsesToGoogleSheet(auth, sheetId, responses) {
    const sheets = google.sheets({ version: "v4", auth });

    const headers = [
        "Question", "OptionA", "OptionB", "OptionC", "OptionD", "Answer", "Sub_topic", "toughness", "explanation"
    ];

    const values = responses.map(response => headers.map(header => response[header]));

    const resource = {
        values: [headers, ...values],  // Include headers in the values array
    };

    try {
        await sheets.spreadsheets.values.update({
            spreadsheetId: GOOGLE_SHEET_ID,
            range: `Responses ${new Date().toLocaleDateString()}!A1`,
            valueInputOption: "RAW",
            resource: resource,  // Use the resource variable here
        });

        console.log("Responses saved to Google Sheet successfully.");
    } catch (error) {
        console.error("Error saving to Google Sheets:", error);
        throw error;
    }
}

async function start() {
    try {
        const prompt_responses = await getPromptResponses();
        const final_json_sheet = extractQuestionsData(prompt_responses);

        const auth = new google.auth.GoogleAuth({
            keyFile: GOOGLE_KEYFILE_PATH,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const authClient = await auth.getClient();

        const newSheetId = await createNewSheet(authClient);
        await saveResponsesToGoogleSheet(authClient, newSheetId, final_json_sheet);

        const sheetUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit#gid=${newSheetId}`;
        await open(sheetUrl);

    } catch (error) {
        console.error("Error during processing:", error);
    }
}

start();
