import mongoose from "mongoose";
import Info from "../models/UserInfo.model.js"; 

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Info.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email incorrect ou utilisateur inexistant.",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Mot de passe incorrect.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      user, 
    });
  } catch (error) {
    console.error("Erreur pendant la connexion :", error.message);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
