export default function VendorCard({ vendor }: any) {
    return (
        <div className="bg-white/5 border border-white/10 p-4 rounded-[2rem] flex items-center gap-4">
            <div className="w-16 h-16 bg-[#FFD700] rounded-2xl flex-shrink-0" />
            <div>
                <h3 className="text-white font-black italic uppercase text-sm">{vendor?.name || 'Quickser Kitchen'}</h3>
                <p className="text-[#FFD700] text-[10px] font-bold uppercase tracking-widest">Specialist • 4.9 ★</p>
            </div>
        </div>
    );
}