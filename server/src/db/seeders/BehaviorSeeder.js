import { Behavior } from "../../models/index.js";

class BehaviorSeeder {
  static async seed() {
    try {
      await Behavior.query().insert({ trait: "nice" })
      await Behavior.query().insert({ trait: "edgy" })
      await Behavior.query().insert({ trait: "funny" })
      await Behavior.query().insert({ trait: "cool" })
      await Behavior.query().insert({ trait: "confident" })
      await Behavior.query().insert({ trait: "adventurous" })
      await Behavior.query().insert({ trait: "intelligent" })
      await Behavior.query().insert({ trait: "creative" })
      await Behavior.query().insert({ trait: "compassionate" })
      await Behavior.query().insert({ trait: "thoughtful" })
      await Behavior.query().insert({ trait: "courageous" })
      await Behavior.query().insert({ trait: "charismatic" })
      await Behavior.query().insert({ trait: "spontaneous" })
      await Behavior.query().insert({ trait: "open-minded" })
      await Behavior.query().insert({ trait: "reliable" })
      await Behavior.query().insert({ trait: "empathetic" })
      await Behavior.query().insert({ trait: "organized" })
      await Behavior.query().insert({ trait: "honest" })
      await Behavior.query().insert({ trait: "ambitious" })
      await Behavior.query().insert({ trait: "conflict-averse" })
      await Behavior.query().insert({ trait: "perfectionist" })
      await Behavior.query().insert({ trait: "easygoing" })
      await Behavior.query().insert({ trait: "analytical" })
      await Behavior.query().insert({ trait: "detail-oriented" })
      await Behavior.query().insert({ trait: "innovative" })
      await Behavior.query().insert({ trait: "resourceful" })
      await Behavior.query().insert({ trait: "determined" })
      await Behavior.query().insert({ trait: "curious" })
      await Behavior.query().insert({ trait: "adaptable" })
      await Behavior.query().insert({ trait: "patient" })
      await Behavior.query().insert({ trait: "assertive" })
      await Behavior.query().insert({ trait: "persuasive" })
      await Behavior.query().insert({ trait: "enthusiastic" })
      await Behavior.query().insert({ trait: "flexible" })
      await Behavior.query().insert({ trait: "arrogant" })
      await Behavior.query().insert({ trait: "manipulative" })
      await Behavior.query().insert({ trait: "stubborn" })
      await Behavior.query().insert({ trait: "vain" })
      await Behavior.query().insert({ trait: "judgmental" })
      await Behavior.query().insert({ trait: "pessimistic" })
      await Behavior.query().insert({ trait: "defensive" })
      await Behavior.query().insert({ trait: "self-centered" })
      await Behavior.query().insert({ trait: "impatient" })
      await Behavior.query().insert({ trait: "close-minded" })
      await Behavior.query().insert({ trait: "inflexible" })
      await Behavior.query().insert({ trait: "rude" })
      await Behavior.query().insert({ trait: "dramatic" })
      await Behavior.query().insert({ trait: "passive-aggressive" })
      await Behavior.query().insert({ trait: "deceitful" })
      await Behavior.query().insert({ trait: "irresponsible" })
    } catch (error) {
      console.error(error)
    }

  }
}

export default BehaviorSeeder