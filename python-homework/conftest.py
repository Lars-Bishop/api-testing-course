import pytest

from utils.config import TEAM_ID, INVALID_TOKEN, VALID_TOKEN


@pytest.fixture
def team_id():
    return TEAM_ID


@pytest.fixture
def valid_token():
    return VALID_TOKEN

@pytest.fixture
def invalid_token():
    return INVALID_TOKEN