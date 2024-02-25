const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const createAssistant = async (name, instructions) => {
  try {
    const assistant = await openai.beta.assistants.create({
      name,
      instructions,
      model: "gpt-3.5-turbo-1106",
    });
    console.log(assistant);
    return assistant;
  } catch (error) {
    throw error;
  }
};

const createThread = async () => {
  try {
    const thread = await openai.beta.threads.create();

    console.log(thread)
    return thread;
  } catch (error) {
    throw error;
  }
};

const sendMessage = async (threadId, text) => {
  try {
    const message = await openai.beta.threads.messages.create(
        threadId,
        {
          role: "user",
          content: text
        }
      );
    console.log(message)
    return message;
  } catch (error) {
    throw error;
  }
};


const runAssistant = async (threadId, assistantId) => {
    try {
        const run = await openai.beta.threads.runs.create(
            threadId,
            { 
              assistant_id: assistantId,
              instructions: "Please polite"
            }
          );
      console.log(run)
      return run;
    } catch (error) {
      throw error;
    }
  };

  const checkRunStatus = async (threadId, runId) => {
    try {
        const run = await openai.beta.threads.runs.retrieve(
            threadId,
            runId
          );
      console.log(run)
      return run;
    } catch (error) {
      throw error;
    }
  };

  const getResponse = async (threadId) => {
    try {
        const messages = await openai.beta.threads.messages.list(
            threadId
          );
      console.log(messages.body.data[0].content)
      return messages;
    } catch (error) {
      throw error;
    }
  };
// createAssistant("testass", "you are rwandan laws experts and you answer users question only related to law basing on your knowleadge. if you do not have the answer for the asked question, relpy saying that currently you do not have information regarding the asked question.");
// createThread(process.env.ASSISTANT_ID)
// sendMessage(process.env.THREAD_ID, "What can happen to me if i take rwanda users data outsite the country without informing authority? which artile talks about that?")
// runAssistant(process.env.THREAD_ID, process.env.ASSISTANT_ID)
// checkRunStatus(process.env.THREAD_ID, process.env.RUN_ID)
// getResponse(process.env.THREAD_ID)
module.exports = { createAssistant, createThread, sendMessage, runAssistant, checkRunStatus, getResponse  };