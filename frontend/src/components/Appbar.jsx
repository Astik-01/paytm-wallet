// need to pass the name of the user to the appbar component.
export const Appbar = ({ name }) => {
    
    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="font-bold text-lg">
                PayTM App
            </div>
            <div className="flex items-center">
                <div className="mr-4">
                    Hello, {name ? name : "User"}
                </div>
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center mt-1 text-xl">
                    <div className="flex justify-center text-slate-700">
                        {name? name[0].toUpperCase() : "U"} {/* This will eventually be the user's first initial */}
                    </div>
                </div>
            </div>
        </div>
    );
};