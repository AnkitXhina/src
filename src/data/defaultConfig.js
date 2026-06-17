export const defaultConfig = {
  content: {
    initial: {
      title: "How was your experience?",
      subtitle: "Your feedback helps us build a better product.",
    },
    feedback: {
      ratingType: "stars",
      options: [
        { id: "opt-1", text: "Easy to use" },
        { id: "opt-2", text: "Great support" },
        { id: "opt-3", text: "Solved my problem" },
      ],
      showComment: true,
      submitText: "Submit Feedback",
    },
    thankYou: {
      media: null,
      mediaType: null,
      title: "Thank you! 🎉",
      subtitle: "We appreciate you taking the time.",
      buttonText: "Close",
    },
  },
  styling: {
    backgroundColor: "#ffffff",
    titleColor: "#111827",
    subtitleColor: "#6B7280",
    buttonColor: "#6366F1",
    buttonTextColor: "#ffffff",
    fontSize: 15,
    fontWeight: "Medium",
    borderRadius: 10,
    buttonWidth: 100,
    buttonHeight: 44,
    ratingSelectedColor: "#F59E0B",
    ratingUnselectedColor: "#E5E7EB",
  },
};