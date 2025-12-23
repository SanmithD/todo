import AddEmployee from "../components/AddEmployee";
import Details from "../components/Details";

function Home() {
  return (
    <div className="h-full bg-[#020202]  container mx-auto" >
      <div >
        <div className="flex justify-between items-center space-y-3 px-2" >
        <div className=" text-[20px] md:text-2xl font-medium tracking-wide" >Employee Dashboard</div>
        <div>
          <AddEmployee/>
        </div>
        </div>
        <div className="h-screen" >
        <Details />
        </div>
      </div>
    </div>
  );
}

export default Home;
