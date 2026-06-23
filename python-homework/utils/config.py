from dotenv import load_dotenv
import os

load_dotenv()

TEAM_ID = os.getenv("TEAM_ID")
VALID_TOKEN = os.getenv("VALID_TOKEN")
INVALID_TOKEN = os.getenv("INVALID_TOKEN")

BASE_URL = "https://api.clickup.com/api/v2"