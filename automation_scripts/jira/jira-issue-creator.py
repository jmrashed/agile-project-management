import requests
import json

# Jira API credentials
JIRA_DOMAIN = 'your-domain.atlassian.net'  # Replace with your Jira domain
USER_EMAIL = 'your-email@example.com'  # Replace with your email
API_TOKEN = 'your-api-token'  # Replace with your Jira API token

# Jira API base URL
BASE_URL = f'https://{JIRA_DOMAIN}/rest/api/3/'

# Jira authentication headers
auth = (USER_EMAIL, API_TOKEN)

# Function to create an issue in Jira
def create_issue(project_key, summary, description, issue_type='Task'):
    url = BASE_URL + 'issue'

    # Prepare the issue payload
    payload = {
        "fields": {
            "project": {
                "key": project_key  # The project key for which the issue is created
            },
            "summary": summary,
            "description": description,
            "issuetype": {
                "name": issue_type  # Issue type (e.g., Task, Bug, Story)
            }
        }
    }

    headers = {
        "Content-Type": "application/json"
    }

    # Send the POST request to create the issue
    response = requests.post(url, data=json.dumps(payload), headers=headers, auth=auth)

    if response.status_code == 201:
        print(f'Issue created successfully: {response.json()["key"]}')
    else:
        print(f'Error creating issue: {response.status_code}')
        print(response.text)

# Example usage
if __name__ == "__main__":
    project_key = 'PROJ'  # Replace with your Jira project key
    summary = 'Example Task'  # The summary of the issue
    description = 'This is an example description for the task.'  # The description of the issue

    create_issue(project_key, summary, description)
