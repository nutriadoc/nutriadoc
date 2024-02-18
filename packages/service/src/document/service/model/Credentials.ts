import Credential from "./Credential.ts";

export default interface Credentials {
  write?: Credential

  read: Credential
}