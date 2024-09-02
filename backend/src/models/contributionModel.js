const mongoose = require('mongoose');

// Define the Contribution schema
const ContributionSchema = new mongoose.Schema({
    username: { type: String, required: true },
    date: { type: Date, required: true },
    commits: { type: Number, default: 0 },
    pullRequests: { type: Number, default: 0 },
    issues: { type: Number, default: 0 },
    codeReviews: { type: Number, default: 0 },
    totalContributions: { type: Number, default: 0 }
});

// Pre-save hook to calculate total contributions
ContributionSchema.pre('save', function(next) {
    this.totalContributions = this.commits + this.pullRequests + this.issues + this.codeReviews;
    next();
});

// Static method to find contributions by username and date range
ContributionSchema.statics.findByUserAndDateRange = function(username, startDate, endDate) {
    return this.find({
        username: username,
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    });
};

// Create the Contribution model from the schema
const Contribution = mongoose.model('Contribution', ContributionSchema);

module.exports = Contribution;
