from utils.payloads import valid_goal_payload
from utils.requests_helper import send_request


def test_get_goal(team_id, valid_token):

    payload = valid_goal_payload()

    #CREATE
    response = send_request("POST", f"/team/{team_id}/goal", valid_token, payload)
    assert response.status_code == 200
    goal_id = response.json()["goal"]["id"]
    assert goal_id is not None

    #GET
    response = send_request("GET", f"/goal/{goal_id}", valid_token)
    assert response.status_code == 200
    body = response.json()
    assert "goal" in body
    goal = body["goal"]
    assert goal["id"] == goal_id
    assert goal["name"] == payload["name"]
    assert goal["description"] == payload["description"]
    assert goal["color"] == payload["color"]
    assert goal["due_date"] == str(payload["due_date"])

    #DELETE
    response = send_request("DELETE", f"/goal/{goal_id}", valid_token)

    assert response.status_code == 200