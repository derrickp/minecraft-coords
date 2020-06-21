export class NoUserFoundError extends Error {
  name = "NoUserFound";
  message = "No user found that has been persisted.";
  stack?: string | undefined;
}
