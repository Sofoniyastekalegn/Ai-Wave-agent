import { llmClient } from '../llm/client';
import { reviewRepository } from "../repository/review.repository";

export const reviewService = {
    async summarizeReviews(productId: number): Promise<string> {
        const exisitngSummary = await reviewRepository(productId);
        if (exisitngSummary) {
            return exisitngSummary;
        }
        const reviews = await reviewRepository.getReviews(productId, 10);
        const joinedReviews = reviews.map((r) => r.content).join('\n\n');

        const summary = await llmClient.summarizeReviews(joinedReviews);
        await reviewRepository.storeReviewSummary(productId, summary);

        return summary;
    },
};



