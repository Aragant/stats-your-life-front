import { useNavigate } from "react-router";



export default function TaskHeader() {
    const navigate = useNavigate();

    return (
        <div className="mb-8 flex items-center justify-between gap-4">
                    <div className="">
                        <h1 className="text-4xl font-bold text-font mb-2">
                            Mes Routines
                        </h1>
                    </div>

                    <button
                        onClick={() => navigate("/routineCreate")}
                        className="bg-primary-3 text-white px-4 py-3 md:px-6 md:py-3 rounded-lg font-bold hover:bg-primary-2 active:bg-primary transition-colors shadow-md inline-block text-center"
                    >
                        New routine
                    </button>
                </div>
    );
}