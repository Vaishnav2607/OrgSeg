# Default
import os
import requests
from groq import Groq
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

groq_api_key = os.getenv("GROQ_API")
gmap_api_key = os.getenv("MAPS_API")

client = Groq(
    # This is the default and can be omitted
    api_key=groq_api_key,
)

def gen_res(data, chat_history):
  response = client.chat.completions.create(model="llama3-70b-8192", messages=chat_history)
  print(response)
  return response.choices[0].message.content



def find_app_doc(data):

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "Answer in a single word, you are a helpful assistant. You will be given a medical diagnosis, you must return what type of doctor needs to be consulted for the problems mentioned by the user in a single word"
            },
            {
                "role": "user",
                "content": data,
            }
        ],
        model="llama3-70b-8192",
    )
    return chat_completion.choices[0].message.content

def find_nearby_doctors(lat, lng, doc_type):
    GOOGLE_MAPS_API_KEY = gmap_api_key
    places_url = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=5000&keyword={doc_type}&key={GOOGLE_MAPS_API_KEY}'
    response = requests.get(places_url)
    places_data = response.json()

    if places_data['status'] == 'OK':
        for place in places_data.get('results', []):
            print(place)
            break
        return [
            {
                'name': place['name'],
                'address': place.get('vicinity', ''),
                'rating': place.get('rating', 'N/A')
            } for place in places_data.get('results', [])
        ]
    
    else:
        return []

def getCoords(location):
    google_maps_api_key = 'AIzaSyAPXF7A_0vCzpkSguqNjhKuLkVgSzCZ_Xs'
    geocode_url = f'https://maps.googleapis.com/maps/api/geocode/json?address={location}&key={google_maps_api_key}'
    response = requests.get(geocode_url)
    geocode_data = response.json()
    if geocode_data['status'] == 'OK':
        coordinates = geocode_data['results'][0]['geometry']['location']
        latitude = coordinates['lat']
        longitude = coordinates['lng']
    else:
        latitude = None
        longitude = None
    return latitude, longitude

# print(chat_completion.choices[0].message.content)