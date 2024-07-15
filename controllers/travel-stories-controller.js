import TravelStory from "../models/TravelStory.js";
import User from "../models/User.js";

const stories = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const loggedInUser = await User.findById(loggedInUserId);
    const followedUserIds = [
      ...loggedInUser.following.map((followedUser) => followedUser._id),
      loggedInUserId,
    ];

    const response = await TravelStory.find({
      userId: { $in: followedUserIds },
    })
      .sort({ createdAt: -1 })
      .populate("userId", ["username", "profilePicture"])
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: ["username", "profilePicture"],
        },
      });

    const storiesWithSortedComments = response.map((story) => {
      story.comments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return story;
    });

    res.status(200).json({ stories: storiesWithSortedComments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch stories" });
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
      placesToVisit: JSON.parse(placesToVisit),
      itinerary: JSON.parse(req.body.dayByDayItinerary),
      tips: tips,
    };

    const photos = req.files.map((file) => file.path);

    const newStory = new TravelStory({
      ...newdata,
      userId: req.user.id,
      photos,
    });

    const response = await TravelStory.create(newStory);
    res.status(201).json({
      message: "Travel story created successfully",
      story: { id: response._id },
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

    res.status(200).json({ response });
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
  const { comment } = req.body;
  const userId = req.user.id;

  try {
    const travelStory = await TravelStory.findById(storyId);

    if (!travelStory) {
      return res.status(404).json({ message: "Travel story not found" });
    }

    const newComment = {
      userId,
      comment,
    };

    travelStory.comments.push(newComment);
    await travelStory.save();

    const response = await TravelStory.find({}, "comments")
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: ["username", "profilePicture"],
        },
      });

    const comments = response.map((story) => {
      return story.comments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    });

    res.status(201).json(comments[0]);
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
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { stories, createStory, singleStory, addComment, deleteComment };
