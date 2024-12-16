import mongoose from "mongoose";
import Channel from "../models/Channel.js";
import User from "../models/User.js";

export const createChannel = async (req, res) => {
    // checking for all required fields 
    if (!req.body.channelName) {
        return res.status(400).json({ success: false, message: "channel name is required" });
    }
    if (!req.body.owner) {
        return res.status(400).json({ success: false, message: "channel owner is required" });
    }
    if (!req.body.description) {
        return res.status(400).json({ success: false, message: "channel description is required" });
    }
    if (!req.body.channelLogo) {
        return res.status(400).json({ success: false, message: "channel logo is required" });
    }
    if (!req.body.channelBanner) {
        return res.status(400).json({ success: false, message: "channel banner is required" });
    }

    // getting data from form

    const { channelName, owner, description, channelLogo, channelBanner } = req.body;
    try {
        const ownerMatch = await User.findOne({ _id: owner });
        const channelMatch = await Channel.findOne({ channelName: channelName });

        if (channelMatch) {
            return res.status(400).json({ success: false, message: "channel name already taken !" });
        }

        if (!ownerMatch) {
            return res.status(403).json({ success: false, message: "invalid credentials" });
        }
        if (ownerMatch.channel.length >= 1) {
            return res.status(400).json({ success: false, message: "user can only have 1 channel with 1 email" });
        }
        const channel = await Channel.create({ channelName, owner, description, channelLogo, channelBanner });

        // populate user and update channel in user model to added channel 

        ownerMatch.channel.push(channel._id);
        await ownerMatch.save();
        res.status(201).json({ success: true, message: "channel created", channel });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "server error" })
    }
}

// controller for getting specific channel

export const getSpecificChannel = async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: "invalid object id" });
    }

    const id = req.params.id;
    try {
        const result = await Channel.findById(id);
        if (!result || result.length < 1) {
            return res.status(404).json({ success: false, message: "channel not found" });
        }
        res.status(200).json({ success: true, channel: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}


export const getMyChannel = async (req, res) => {

    const id = req.params.uid;
    try {
        const result = await Channel.findOne({owner: id});
        if (!result || result.length < 1) {
            return res.status(404).json({ success: false, message: "channel not found" });
        }
        res.status(200).json({ success: true, channel: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}


// controller for getting delete channel

export const deleteChannel = async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: "invalid channel" });
    }

    if (!mongoose.isValidObjectId(req.params.uId)) {
        return res.status(400).json({ success: false, message: "invalid user" });
    }

    const cId = req.params.id;
    const userId = req.params.uId;
    try {
        const channel = await Channel.findById(cId);
        if (!channel) {
            return res.status(404).json({ success: false, message: "channel not found" });
        }
        if (channel.owner.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "unauthorised access" })
        }
        const result = await Channel.findByIdAndDelete(cId);
        await User.findByIdAndUpdate(userId, { $pull: { channel: cId } });

        res.status(200).json({ success: true, message: "channel deleted successfully", channel: result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error occured" });
    }
}
