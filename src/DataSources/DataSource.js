import WebController from '../Controllers/WebController';

class DataSource {
  constructor(path) {
    this.path = path;
  }

  get() {
    return new Promise((resolve, reject) => {
      try {
        const result = WebController.shared.get(this.path);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default DataSource;
