const axios = require('axios');

// Jira API credentials (replace with your actual Jira credentials)
const JIRA_DOMAIN = 'your-domain.atlassian.net'; // Jira domain
const USER_EMAIL = 'your-email@example.com'; // Jira email
const API_TOKEN = 'your-api-token'; // Jira API token

// Jira API base URL
const BASE_URL = `https://${JIRA_DOMAIN}/rest/api/3/`;

// Jira authentication headers
const authHeaders = {
  auth: {
    username: USER_EMAIL,
    password: API_TOKEN,
  },
};

// Function to create an issue in Jira
const createIssue = async (projectKey, summary, description, issueType) => {
  try {
    const response = await axios.post(
      `${BASE_URL}issue`,
      {
        fields: {
          project: {
            key: projectKey,
          },
          summary: summary,
          description: description,
          issuetype: {
            name: issueType,
          },
        },
      },
      { auth: { username: USER_EMAIL, password: API_TOKEN } }
    );
    console.log(`Issue Created: ${response.data.key}`);
  } catch (error) {
    console.error('Error creating issue:', error.response.data);
  }
};

// Function to assign an issue to a user
const assignIssue = async (issueKey, assigneeEmail) => {
  try {
    const response = await axios.put(
      `${BASE_URL}issue/${issueKey}/assignee`,
      {
        assignee: {
          name: assigneeEmail,
        },
      },
      { auth: { username: USER_EMAIL, password: API_TOKEN } }
    );
    console.log(`Issue ${issueKey} assigned to ${assigneeEmail}`);
  } catch (error) {
    console.error('Error assigning issue:', error.response.data);
  }
};

// Function to transition an issue to a different status (e.g., from "To Do" to "In Progress")
const transitionIssue = async (issueKey, transitionId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}issue/${issueKey}/transitions`,
      {
        transition: {
          id: transitionId,
        },
      },
      { auth: { username: USER_EMAIL, password: API_TOKEN } }
    );
    console.log(`Issue ${issueKey} transitioned to status ${transitionId}`);
  } catch (error) {
    console.error('Error transitioning issue:', error.response.data);
  }
};

// Example usage
const main = async () => {
  // Create a new issue
  await createIssue('PROJ', 'Example Task', 'This is a description of the task.', 'Task');
  
  // Assign the issue to a user
  const issueKey = 'PROJ-1'; // Replace with actual issue key
  await assignIssue(issueKey, 'developer@example.com');
  
  // Transition the issue to "In Progress"
  const transitionId = '21'; // Replace with the correct transition ID for your Jira setup
  await transitionIssue(issueKey, transitionId);
};

// Run the script
main();
