import mongoose from "mongoose";
import Info from "../models/UserInfo.model.js";
import bcrypt from "bcryptjs";  

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await Info.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Cet email est déjà utilisé.",
      });
    }

    const newUser = new Info({
      UserId: Date.now().toString(), 
      FirstName: firstName,
      LastName: lastName,
      email,
      password: password, 
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès.",
      user: newUser,
    });
  } catch (error) {
    console.error("Erreur lors du sign up :", error.message);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
