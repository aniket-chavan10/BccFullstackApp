// src/services/api.js

const BASE_URL = 'https://bccfullstackapp-1.onrender.com/api'; // Replace with your backend base URL

export async function fetchCarouselItems() {
  try {
    const response = await fetch(`${BASE_URL}/carousel`);
    if (!response.ok) {
      throw new Error('Failed to fetch carousel items');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching carousel items:', error);
    throw error;
  }
}
// Function to add a new carousel item
// src/services/api.js

export const addCarouselData = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/carousel`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add carousel data: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding carousel data:', error);
    throw error;
  }
};


// Function to fetch players data
export async function fetchPlayersData() {
  try {
    const response = await fetch(`${BASE_URL}/players`);
    if (!response.ok) {
      throw new Error("Failed to fetch players data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching players data:", error);
    throw error;
  }
}

export async function addPlayerData(playerData) {
  try {
    const response = await fetch(`${BASE_URL}/players`, {
      method: 'POST',
      body: playerData,
    });

    if (!response.ok) {
      throw new Error("Failed to post player data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting player data:", error);
    throw error;
  }
}

export async function updatePlayerData(playerId, playerData) {
  try {
    const formData = new FormData();
    Object.keys(playerData).forEach(key => {
      formData.append(key, playerData[key]);
    });

    const response = await fetch(`${BASE_URL}/players/${playerId}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from server:', errorData);
      throw new Error("Failed to update player data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating player data:", error);
    throw error;
  }
}


// Function to fetch news data

// Fetch all news data, sorted by createdAt in descending order
export async function fetchNewsData() {
  try {
    const response = await fetch(`${BASE_URL}/news`);
    if (!response.ok) {
      throw new Error("Failed to fetch news data");
    }
    const data = await response.json();
    // Sort data by createdAt in descending order
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
}

// Fetch a single news item by ID
export async function fetchNewsItemById(id) {
  try {
    const response = await fetch(`${BASE_URL}/news/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch news item with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching news item with ID ${id}:`, error);
    throw error;
  }
}

// Add a new news item
export const addNewsData = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/news`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to add news data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding news data:", error);
    throw error;
  }
};




// Function to fetch gallery data

export async function fetchGalleryData() {
  try {
    const response = await fetch(`${BASE_URL}/gallery`);
    if (!response.ok) {
      throw new Error('Failed to fetch gallery data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    throw error;
  }
}

export async function addGalleryData(formData) {
  try {
    const response = await fetch(`${BASE_URL}/gallery/add`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to add gallery data');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding gallery data:', error);
    throw error;
  }
}

export async function fetchGalleryItemById(id) {
  try {
    const response = await fetch(`${BASE_URL}/gallery/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch gallery item');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    throw error;
  }
}





//Fixtures api strts from here 
//
//
//
//
//
//
//
export async function fetchFixtures() {
  try {
    const response = await fetch(`${BASE_URL}/fixtures`);
    if (!response.ok) {
      throw new Error(`Failed to fetch fixtures: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.fixtures; // Assuming the response JSON has a 'fixtures' array
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    throw error;
  }
}

// Fetch a fixture by ID
export const fetchFixtureById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/fixtures/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch fixture: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching fixture:', error);
    throw error;
  }
};

// Create a new fixture
export async function addFixtureData(fixtureData) {
  try {
    const formData = new FormData();
    formData.append('date', fixtureData.date);
    formData.append('matchNumber', fixtureData.matchNumber);
    formData.append('matchStatus', fixtureData.matchStatus);
    formData.append('team1Name', fixtureData.team1.name);
    formData.append('team1Score', fixtureData.team1.score);
    formData.append('team1Logo', fixtureData.team1.logo); // Match field name
    formData.append('team2Name', fixtureData.team2.name);
    formData.append('team2Score', fixtureData.team2.score);
    formData.append('team2Logo', fixtureData.team2.logo); // Match field name
    formData.append('matchResult', fixtureData.matchResult);
    formData.append('venue', fixtureData.venue);
    formData.append('matchTime', fixtureData.matchTime);

    const response = await fetch(`${BASE_URL}/fixtures`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to post fixture data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting fixture data:', error);
    throw error;
  }
}


// Update a fixture
export const updateFixture = async (id, fixtureData) => {
  try {
    const response = await fetch(`${BASE_URL}/fixtures/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fixtureData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update fixture: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating fixture:', error);
    throw error;
  }
};



// for info of crickte club
export const fetchLatestInfo = async () => {
  try {
    const response = await fetch(`${BASE_URL}/info`);
    if (!response.ok) {
      throw new Error('Failed to fetch latest cricket club');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching latest cricket club:', error);
    throw error;
  }
};

export const updateInfo = async (id, formData) => {
  try {
    const response = await fetch(`${BASE_URL}/info/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update cricket club: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating cricket club:', error);
    throw error;
  }
};

export const saveInfo = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/info`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to save cricket club: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving cricket club:', error);
    throw error;
  }
};




export const login = async (email, password) => {
  try {
      const response = await fetch(`${BASE_URL}/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
          // Handle non-2xx HTTP responses
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      return data; // Assuming this contains the token
  } catch (error) {
      // Log full error for debugging
      console.error('API login error:', {
          message: error.message,
      });
      throw new Error(error.message || 'Something went wrong');
  }
};