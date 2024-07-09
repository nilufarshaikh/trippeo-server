import TravelStory from "../models/TravelStory.js";

const stories = async (_req, res) => {
  try {
    const response = await TravelStory.find();

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch stories" });
  }
};

export { stories };
