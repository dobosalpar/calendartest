class WebController {
  static shared = WebController.shared ? WebController.shared : new WebController;

  constructor() {
    this.token = null;
    this.headers = {
      
    }
  }

  async get(path) {
    const response = await fetch(path, {
      method: 'GET',
      headers: this.headers,
    });
    return await response.json();
  }


}

export default WebController;
