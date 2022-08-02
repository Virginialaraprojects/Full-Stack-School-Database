import React, { useState } from 'react';


const CreateCourse =() => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [userId, setUserId] = useState('');//authenticatembr
    const [errors, setErrors] = useState([]);




return (
    <main>
    <div className="wrap">
        <h2>Create Course</h2>
        <form>
            <div className="main--flex">
                <div>
                    <label for="courseTitle">Course Title</label>
                    <input id="courseTitle" name="courseTitle" type="text" value="">

                    <p>By Joe Smith</p>

                    <label for="courseDescription">Course Description</label>
                    <textarea id="courseDescription" name="courseDescription"></textarea>
                </div>
                <div>
                    <label for="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" value="">

                    <label for="materialsNeeded">Materials Needed</label>
                    <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                </div>
            </div>
            <button class="button" type="submit">Create Course</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
        </form>
    </div>
</main>
);







};

export default CreateCourse;