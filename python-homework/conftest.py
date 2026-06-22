import pytest

from utils.config import TEAM_ID
from utils.config import VALID_TOKEN


@pytest.fixture
def team_id():
    return TEAM_ID


@pytest.fixture
def valid_token():
    return VALID_TOKEN