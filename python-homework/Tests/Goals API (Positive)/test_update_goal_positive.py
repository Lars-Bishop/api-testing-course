from utils.payloads import valid_goal_payload
from utils.requests_helper import send_request


def test_update_goal(team_id, valid_token):

    payload = valid_goal_payload()

    #CREATE
    response = send_request("POST", f"/team/{team_id}/goal", valid_token, payload)
    assert response.status_code == 200
    goal_id = response.json()["goal"]["id"]
    assert goal_id is not None
    update_payload = valid_goal_payload()

    #UPDATE
    response = send_request("PUT", f"/goal/{goal_id}", valid_token, update_payload)
    assert response.status_code == 200

    #GET
    response = send_request("GET", f"/goal/{goal_id}", valid_token)
    assert response.status_code == 200
    goal = response.json()["goal"]
    assert goal["id"] == goal_id
    assert goal["name"] == update_payload["name"]
    assert goal["description"] == update_payload["description"]
    assert goal["color"] == update_payload["color"]
    assert goal["due_date"] == str(update_payload["due_date"])

    #DELETE
    response = send_request("DELETE", f"/goal/{goal_id}", valid_token)
    assert response.status_code == 200