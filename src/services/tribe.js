import colors from "colors";

class TribeService {
  constructor() {}

  async getInfo(user) {
    try {
      const { data } = await user.http.get(2, "tribe/my");
      if (data) {
        return true;
      } else if (data.id !== "9d9565c8-a9ca-4ff7-9fc7-3519c4d27753") {
        await user.http.post(2, "tribe/leave",{});
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.response?.data?.message === "NOT_FOUND") {
        return false;
      } else {
        // user.log.logError(
        //   `Lấy thông tin tribe thất bại: ${error.response?.data?.message}`
        // );
        return null;
      }
    }
  }

  async joinTribe(user, tribeId = "9d9565c8-a9ca-4ff7-9fc7-3519c4d27753") {
    const endpoint = `tribe/${tribeId}/join`;
    try {
      const { data } = await user.http.post(2, endpoint, {});
      if (data) {
        user.log.log(
          "Tham gia thành công Tribe: " + data.id
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      user.log.logError(
        `Tham gia tribe thất bại: ${error.response?.data?.message}`
      );
    }
  }

  async handleTribe(user) {
    const infoTribe = await this.getInfo(user);
    if (infoTribe === null) return;
    if (!infoTribe) {
      await this.joinTribe(user);
    }
  }
}

const tribeService = new TribeService();
export default tribeService;
