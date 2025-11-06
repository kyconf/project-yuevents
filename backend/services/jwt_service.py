import jwt
import datetime
from jwt import ExpiredSignatureError, InvalidTokenError

class JwtService:
    def __init__(self, secret_key: str, algorithm: str = "HS256", expiry_minutes: int = 60*60*24):
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.expiry_minutes = expiry_minutes

    def create_token(self, user_id: str, username: str, extra_claims: dict = None) -> str:
        """
        Create a JWT token with default and optional custom claims.
        """
        payload = {
            "user_id": user_id,
            "username": username,
            "exp": datetime.datetime.now(datetime.timezone.utc)() + datetime.timedelta(minutes=self.expiry_minutes),
            "iat": datetime.datetime.now(datetime.timezone.utc)()
        }

        if extra_claims:
            payload.update(extra_claims)

        token = jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
        return token

    def decode_token(self, token: str) -> dict:
        """
        Decode and verify a JWT token. Raises an exception if invalid or expired.
        """
        try:
            decoded = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return decoded
        except ExpiredSignatureError:
            raise ValueError("Token has expired")
        except InvalidTokenError:
            raise ValueError("Invalid token")

    def refresh_token(self, token: str) -> str:
        """
        Create a new token with the same data as the old one, if it’s still valid.
        """
        decoded = self.decode_token(token)
        user_id = decoded.get("user_id")
        username = decoded.get("username")

        # Remove old expiration and issue a new one
        decoded.pop("exp", None)
        decoded.pop("iat", None)

        return self.create_token(user_id, username, extra_claims=decoded)

