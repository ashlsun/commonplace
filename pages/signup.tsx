export default function Signup() {
    
    return (
        <div>
            <h1 className="mt-10 font-bold text-lg">Finish setting up your account:</h1>
            <p className="text-gray-800">It's so wonderful to see a new face around here!</p>
            <br></br>
            <div>How do you want to be called?</div>
            <input className="border focus:border-black border-gray-800 my-2 rounded-sm px-2 outline-none " type="text"></input>
            <p className="text-xs text-gray-800"> (This will be your display name. You can always change it later.)</p>

            <button className="mt-16 border border-black rounded-full px-2 bg-green-200 hover:bg-green-800 transition duration-300">+ Create account!</button>
        </div>
    )
}