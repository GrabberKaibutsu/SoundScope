import React, { useState } from 'react';

function ReviewForm({ itemId, itemType, userId }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: content,
                    itemId: itemId,
                    itemType: itemType,
                    userId: userId
                })
            });
            if (!response.ok) {
                throw new Error('Failed to submit review');
            }
            const result = await response.json();
            console.log('Review submitted:', result);
            //Add more code if needed
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a review..."
                required
            />
            <button type="submit">Submit Review</button>
        </form>
    );
}

export default ReviewForm;
