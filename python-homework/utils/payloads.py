from faker import Faker
import time

faker = Faker()


def valid_goal_payload():
    return {
        "multiple_owners": True,
        "name": faker.company(),
        "due_date": int(time.time() * 1000) + (7 * 24 * 60 * 60 * 1000),
        "description": faker.sentence(),
        "color": faker.hex_color()
    }