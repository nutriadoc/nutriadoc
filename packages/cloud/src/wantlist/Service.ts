import {ApiServer} from "../config/Server.ts";

export default class Service {
  async add(address: string): Promise<void> {
    const response = await fetch(`http://${ApiServer}/LandingPage/wantlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({address})
    })

    if (!response.ok) {
      throw new Error("Failed to add email to wantlist")
    }
  }
}