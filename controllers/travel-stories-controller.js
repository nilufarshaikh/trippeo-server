import TravelStory from "../models/TravelStory.js";

const stories = async (_req, res) => {
  try {
    const response = await TravelStory.find().sort({ createdAt: -1 });

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
    const {
      title,
      location,
      description,
      foodsToTry,
      bestTimeToVisit,
      tips,
      placesToVisit,
    } = req.body;

    const newdata = {
      title: title,
      location: location,
      description: description,
      foodsToTry: foodsToTry,
      bestTimeToVisit: bestTimeToVisit,
      placesToVisit: placesToVisit,
      itinerary: JSON.parse(req.body.dayByDayItinerary),
      tips: tips,
    };

    const photos = req.files.map((file) => file.path);
    //const dayByDayItinerary = JSON.parse(req.body.dayByDayItinerary);

    const newStory = new TravelStory({
      ...newdata,
      userId: req.user.id,
      photos,
      // itinerary: dayByDayItinerary,
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

const singleStory = async (req, res) => {
  const { storyId } = req.params;

  try {
    const response = await TravelStory.findById(storyId).sort({
      createdAt: -1,
    });

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

const addComment = async (req, res) => {
  const { storyId } = req.params;
  const { userId, comment } = req.body;

  try {
    const travelStory = await TravelStory.findById(storyId);

    if (!travelStory) {
      return res.status(404).json({ message: "Travel story not found" });
    }

    const newComment = {
      userId,
      comment,
      createdAt: new Date(),
    };

    travelStory.comments.push(newComment);
    await travelStory.save();

    res.status(201).json(travelStory);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteComment = async (req, res) => {
  const { storyId, commentId } = req.params;

  try {
    const travelStory = await TravelStory.findById(storyId);

    if (!travelStory) {
      return res.status(404).json({ message: "Travel story not found" });
    }

    travelStory.comments = travelStory.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await travelStory.save();

    res.status(200).json(travelStory);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { stories, createStory, singleStory, addComment, deleteComment };
