import { Behavior } from "../../models/index.js";

class BehaviorSeeder {
  static async seed() {
    const traits = ["nice", "edgy", "funny", "cool", "confident", "adventurous", "intelligent", "creative", "compassionate", "thoughtful", "courageous", "charismatic", "spontaneous", "open-minded", "reliable", "empathetic", "organized", "honest", "ambitious", "conflict-averse", "perfectionist", "easygoing", "analytical", "detail-oriented", "innovative", "resourceful", "determined", "curious", "adaptable", "patient", "assertive", "persuasive", "enthusiastic", "flexible", "arrogant", "manipulative", "stubborn", "vain", "judgmental", "pessimistic", "defensive", "self-centered", "impatient", "close-minded", "inflexible", "rude", "dramatic", "passive-aggressive", "deceitful", "irresponsible", "indecisive", "artistic"];

    for (const trait of traits) {
      await Behavior.query().insert({ trait })
    }
  }
}

export default BehaviorSeeder