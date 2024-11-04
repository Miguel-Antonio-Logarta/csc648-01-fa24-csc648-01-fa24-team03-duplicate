const Unauthorized = () => {
    return (
        // adjust vertical centering as needed by 5rem since admin navbar has h-20
        // this is done to hide the scrollbar
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
            <div className="bg-red-100 bg-opacity-90 p-8 rounded-lg border border-red-600 text-center text-xl font-bold text-red-600 shadow-lg">
                YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE
            </div>
        </div>
    );
};

export default Unauthorized;
