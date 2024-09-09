"use client";
import { useState } from "react";
import axios from "axios";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import teamLogo from "../../assets/team_logo.jpg"; // Next.js public folder usage
import { FaExternalLinkAlt, FaTrash } from "react-icons/fa";
import "./index.css"; // Assuming CSS Modules, else use a global import

const Dashboard: React.FC = () => {
  const [prData, setPrData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch data from Next.js API route
  const fetchData = async () => {
    setLoading(true); // Set loading state to true when fetching data
    try {
      const response = await axios.get("/api/summary"); // Call the Next.js API route
      setPrData(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Error fetching data from backend.");
      console.error(err);
    } finally {
      setLoading(false); // Set loading state back to false after fetching data
    }
  };

  // Dummy data for PR list
  const dummyPRs = [
  ];

  const handleDelete = (prNumber: number) => {
    console.log(`Delete PR #${prNumber}`);
    // Here you would typically make an API call to delete the PR from the database
  };

  return (
    <div className='dashboard-container'>
      <div className='dashboard-content'>
        <Tabs.Root defaultValue="dashboard" className="mb-6">
          <Tabs.List className='tabList'>
            <Tabs.Trigger value="dashboard" className='tab-trigger'>
              Dashboard
            </Tabs.Trigger>
            <Tabs.Trigger value="pr-detail" className='tab-trigger'>
              PR Detail
            </Tabs.Trigger>
            <Tabs.Trigger value="feedback" className='tab-trigger'>
              Feedback
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="dashboard" className='tab-content'>
            <h1 className='dashboard-title'>Code Review Dashboard</h1>
            <div className="flex justify-center">
              <button className='fetch-button' onClick={fetchData}>
                Fetch Latest PR Review
              </button>
            </div>
            {loading && <p className='loading-text'>Loading...</p>}
            {error && <p className='error-text'>{error}</p>}
            {prData && (
              <div className='pr-data-container'>
                <h2 className='pr-data-title'>Latest Pull Request Review:</h2>
                <pre className='pr-data-content'>{JSON.stringify(prData, null, 2)}</pre>
              </div>
            )}
            <div className='pr-list-container'>
              <h2 className='pr-list-title'>Pull Requests [Dummy Data Now]</h2>
              <table className='pr-list-table'>
                <thead>
                  <tr>
                    <th>Pull Request</th>
                    <th>Date Added</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyPRs.map((pr) => (
                    <tr key={pr.prNumber}>
                      <td>{`${pr.repo} #${pr.prNumber}`}</td>
                      <td>{new Date(pr.dateAdded).toLocaleString()}</td>
                      <td>
                        <a href={pr.link} target="_blank" rel="noopener noreferrer" className='action-icon'>
                          <FaExternalLinkAlt />
                        </a>
                        <button onClick={() => handleDelete(pr.prNumber)} className='action-icon'>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs.Content>
          <Tabs.Content value="pr-detail" className='tab-content'>
            <h2 className='tab-title'>PR Detail Page</h2>
            <p className='tab-text'>Content for PR Detail page goes here.</p>
          </Tabs.Content>
          <Tabs.Content value="feedback" className='tab-content'>
            <h2 className='tab-title'>Feedback Page</h2>
            <p className='tab-text'>Content for Feedback page goes here.</p>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <Image src={teamLogo} alt="Team Logo" className='team-logo' />
      <a href="https://github.com/Jianwei07/debuggingDragons/tree/main" target="_blank" rel="noopener noreferrer" className='github-link'>
        GitHub Link
      </a>
    </div>
  );
};

export default Dashboard;
