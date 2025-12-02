"use client"

interface EventComment{
    comment: string,
    onChange: (field: string, value: string) => void

}
export default function EventComment({comment, onChange}:EventComment){
    return(
        <div>
          <textarea
          className="w-full md:w-2/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => onChange("comment", e.target.value)}
        />
        </div>
    );
}