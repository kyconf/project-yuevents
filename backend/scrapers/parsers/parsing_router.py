from discord_llm_parser import parse_message_llm
from discord_heuristic_parser import parse_message_heuristic
from validator import validate_event_data, validate_event_post_repair
from repair import repair_event_data

def hybrid_parse_event(message_content: str) -> dict:
    # Try LLM parsing first
    try:
        event = parse_message_llm(message_content)
    except Exception as e:
        print(f"LLM parser failed: {e}")
        return parse_message_heuristic(message_content)
    # print("LLM parser output:", event, "\n\n")

    # Validate LLM output
    is_valid, reason, repairable_fields = validate_event_data(event)
    # print(f"LLM output validation: is_valid={is_valid}, reason={reason}, repairable_fields={repairable_fields}")
    if is_valid:
        return event

    # Try repair if issues are minor
    if repairable_fields:
        repaired = repair_event_data(event, repairable_fields)
        # print("Repaired LLM output:", repaired, "\n\n")
        is_valid_post_repair, reason_post_repair = validate_event_post_repair(repaired)
        # print(f"Post-repair validation: is_valid={is_valid_post_repair}, reason={reason_post_repair}")
        if is_valid_post_repair:
            return repaired  # Repaired LLM output is good
        # else:
              # Fall through to heuristic parser
        
        
    # Otherwise fallback
    # print(f"LLM response rejected ({reason}). Falling back to heuristic parser.")
    return parse_message_heuristic(message_content)

#  Test example
# print(hybrid_parse_event(""""
# 📣 Upcoming Event Alert!
# What: A Hackathon! 💻
# When: This Saturday, starting November 10th, 2025 at 9:00 AM.
# Where: Online/Location TBD
# Details: It's a public event, so everyone is welcome! No capacity limits or RSVP deadlines.
# """))

# TODO: Use the huggingface inference api documentation for schema validation