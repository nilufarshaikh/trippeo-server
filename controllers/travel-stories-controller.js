import TravelStory from "../models/TravelStory.js";

const stories = async (_req, res) => {
  try {
    const response = await TravelStory.find();

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stories",
    });
  }
};

const createStory = async (req, res) => {
  try {
    const newStory = new TravelStory({
      ...req.body,
      userId: req.user.id,
    });

    const response = await TravelStory.create(newStory);
    res.status(201).json({
      success: true,
      data: { id: response._id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating story",
    });
  }
};

export { stories, createStory };
