import { User, Mail, ShieldCheck, Calendar, BadgeCheck } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {

    const { authData } = useSelector((state) => state.auth);
    console.log(authData)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-4 dark:bg-none dark:bg-slate-800">

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden dark:border-slate-500 dark:bg-slate-600">

                {/* HEADER SECTION */}
                <div className="bg-indigo-600 p-8 text-white text-center relative dark:bg-amber-600">

                    <div className="w-28 h-28 bg-white text-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold mx-auto shadow-lg dark:text-red-600">
                        {authData.fullName?.charAt(0)}
                    </div>

                    <h2 className="text-2xl font-bold mt-4">
                        {authData.fullName}
                    </h2>

                    <span className="inline-block mt-2 px-4 py-1 text-sm rounded-full bg-white text-indigo-600 font-medium dark:text-red-500">
                        {authData.role.toUpperCase()}
                    </span>
                </div>

                {/* BODY SECTION */}
                <div className="p-8 grid md:grid-cols-2 gap-8">

                    {/* LEFT SIDE */}
                    <div className="space-y-6">

                        <div className="flex items-center gap-4">
                            <User className="text-indigo-600 dark:text-slate-50" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-100">User ID</p>
                                <p className="font-medium text-slate-800 dark:text-slate-50">{authData.id}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Mail className="text-indigo-600 dark:text-slate-50" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-50">Email Address</p>
                                <p className="font-medium text-slate-800 dark:text-slate-50">{authData.email}</p>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">

                        <div className="flex items-center gap-4">
                            <ShieldCheck className="text-indigo-600 dark:text-slate-50" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-50">Account Status</p>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${authData.status === "active"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-rose-100 text-rose-600"
                                    }`}>
                                    {authData.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Calendar className="text-indigo-600 dark:text-slate-50" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-50">Account Created</p>
                                <p className="font-medium text-slate-800 dark:text-slate-50">{authData.createdAt}</p>
                            </div>
                        </div>

                    </div>

                </div>

                {/* FOOTER BUTTONS */}
                <div className="px-8 pb-8 flex justify-end gap-4">
                    <button className="px-5 py-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition">
                        Edit Profile
                    </button>

                    <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-2 dark:bg-red-600 dark:hover:bg-red-700">
                        <BadgeCheck size={16} />
                        Verify Account
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Profile;
