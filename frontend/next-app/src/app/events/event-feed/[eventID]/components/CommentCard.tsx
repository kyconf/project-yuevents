"use client"
import Rating from "@mui/material/Rating"
import { formatDateTime } from "../page"
import {useState, useEffect} from "react"
interface Comment{
    id: string,
    profile_id: string,
    events_id: string,
    rating: number,
    comment: string,
    create_at: string
}

interface CommentWithUser extends Comment {
    full_name?: string
}

interface Profile{
    id: string,
    full_name: string
}
async function fetchProfile(id: string): Promise<Profile>{
    const res = await fetch(`http://localhost:8000/users/${id}`, {cache: 'no-store'})
    if(!res.ok) throw new Error(`Failed to fetch comment: ${res.status}`);
    const data = await res.json();
    console.log(data)
    return data;
}

async function fetchComment(id: string): Promise<Comment[]>{
    const res = await fetch(`http://localhost:8000/reviews/event/${id}`, {cache: 'no-store'});
    if(!res.ok) throw new Error(`Failed to fetch comment: ${res.status}`);
    const data = await res.json();
    console.log(data)
    return data;
}
export default function CommentCard({ params }: { params: { eventID: string } }) { 
    const [comment, setComment] = useState<CommentWithUser[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    async function loadComments() {
        try {
            setLoading(true);
            const dataComment: Comment[] = await fetchComment(params.eventID);

            // Fetch profile for each comment
            const commentsWithUser: CommentWithUser[] = await Promise.all(
                dataComment.map(async (c) => {
                    const user = await fetchProfile(c.profile_id);
                    return { ...c, full_name: user.full_name };
                })
            );

            setComment(commentsWithUser);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    loadComments();
}, [params.eventID]);
    if (loading) {
    return (
      <div className="mt-20 flex items-center justify-center">
        <p className="text-blue-200 text-xs">Loading comments...</p>
      </div>
     );
    }
    
    
    return(
    <div className="">
        {comment.map(comment => (
            <div key={comment.id} className="w-100 mt-3 bg-gray-300 p-3 rounded-xl">
                 <div className="ml-2 text-gray-600 font-extralight flex items-center gap-4">
                    <p className="max-w-30 overflow-hidden">{comment.full_name}</p>
                    <Rating
                       name="event-rating"
                       value={comment.rating}
                       precision={0.5}
                       readOnly
                       sx={{ fontSize: '0.4cm',
                       color: '#facc15',        
                       '& .MuiRating-iconHover': { color: '#f59e0b', }}
                    }/>
                    <p className="text-xs"><em>{formatDateTime(comment.create_at).date} - {formatDateTime(comment.create_at).time}</em></p>
                 </div>
                 <div className="ml-2 flex items-center">
                    <p>{comment.comment}</p>
                 </div>
            </div>
        ))}
    </div>
    );
}