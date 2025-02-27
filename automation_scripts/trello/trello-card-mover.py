import requests

# Trello API credentials
API_KEY = 'your-api-key'
TOKEN = 'your-oauth-token'

# Board and List IDs (replace with actual values)
BOARD_ID = 'your-board-id'
SOURCE_LIST_ID = 'source-list-id'  # The ID of the source list
TARGET_LIST_ID = 'target-list-id'  # The ID of the target list

# Trello API base URL
BASE_URL = "https://api.trello.com/1/"

# Function to get cards from a specific list
def get_cards_from_list(list_id):
    url = f"{BASE_URL}lists/{list_id}/cards"
    params = {
        "key": API_KEY,
        "token": TOKEN
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to retrieve cards: {response.status_code}")
        return []

# Function to move a card to a different list
def move_card_to_list(card_id, target_list_id):
    url = f"{BASE_URL}cards/{card_id}"
    params = {
        "key": API_KEY,
        "token": TOKEN,
        "idList": target_list_id
    }
    response = requests.put(url, params=params)
    if response.status_code == 200:
        print(f"Card {card_id} successfully moved to list {target_list_id}")
    else:
        print(f"Failed to move card {card_id}: {response.status_code}")

# Main function to move all cards from the source list to the target list
def move_all_cards():
    cards = get_cards_from_list(SOURCE_LIST_ID)
    if cards:
        for card in cards:
            move_card_to_list(card['id'], TARGET_LIST_ID)
    else:
        print("No cards found in the source list.")

if __name__ == "__main__":
    move_all_cards()
