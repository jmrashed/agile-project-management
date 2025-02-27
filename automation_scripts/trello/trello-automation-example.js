const axios = require('axios');

// Replace these with your Trello API key and token
const API_KEY = 'your-api-key';
const TOKEN = 'your-oauth-token';
const BOARD_ID = 'your-board-id';  // Board ID where you want to perform automation
const LIST_ID = 'your-list-id';    // List ID where tasks are organized

// Base URL for Trello API
const BASE_URL = 'https://api.trello.com/1/';

// Function to create a new card in a specified list
const createCard = async (cardName, description) => {
  try {
    const response = await axios.post(`${BASE_URL}cards`, {
      name: cardName,
      desc: description,
      idList: LIST_ID,
      key: API_KEY,
      token: TOKEN,
    });
    console.log(`Card Created: ${response.data.name}`);
  } catch (error) {
    console.error('Error creating card:', error);
  }
};

// Function to move a card to another list
const moveCardToAnotherList = async (cardId, newListId) => {
  try {
    const response = await axios.put(`${BASE_URL}cards/${cardId}`, {
      idList: newListId,
      key: API_KEY,
      token: TOKEN,
    });
    console.log(`Card moved to list: ${response.data.idList}`);
  } catch (error) {
    console.error('Error moving card:', error);
  }
};

// Function to add a checklist to a card
const addChecklistToCard = async (cardId, checklistName) => {
  try {
    const response = await axios.post(`${BASE_URL}cards/${cardId}/checklists`, {
      name: checklistName,
      key: API_KEY,
      token: TOKEN,
    });
    console.log(`Checklist added: ${response.data.name}`);
  } catch (error) {
    console.error('Error adding checklist:', error);
  }
};

// Function to mark a card as complete by checking all checklist items
const completeChecklist = async (cardId, checklistId) => {
  try {
    const checklistItems = await axios.get(`${BASE_URL}checklists/${checklistId}/checkItems`, {
      params: {
        key: API_KEY,
        token: TOKEN,
      },
    });
    for (let item of checklistItems.data) {
      await axios.put(`${BASE_URL}checklists/${checklistId}/checkItems/${item.id}`, {
        state: 'complete',
        key: API_KEY,
        token: TOKEN,
      });
    }
    console.log('Checklist marked as complete!');
  } catch (error) {
    console.error('Error completing checklist:', error);
  }
};

// Example usage
const main = async () => {
  // Create a new card
  await createCard('New Task Example', 'This is a description of the new task.');

  // Move an existing card (replace cardId and newListId with actual IDs)
  const cardId = 'card-id';
  const newListId = 'new-list-id';
  await moveCardToAnotherList(cardId, newListId);

  // Add checklist to card
  await addChecklistToCard(cardId, 'Task Checklist');

  // Complete checklist items
  const checklistId = 'checklist-id';
  await completeChecklist(cardId, checklistId);
};

// Run the script
main();
