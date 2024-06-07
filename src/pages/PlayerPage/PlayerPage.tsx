/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../App";
import Header from "../../components/Header/Header";
import "./PlayerPage.scss";
import { TeamResponse } from "../../models/Team";
import { UserResponse } from "../../models/User";
import { MatchResponse } from "../../models/Match";
import Footer from "../../components/Footer/Footer";

const PlayerPage = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  const [team, setTeam] = useState<TeamResponse | null>(null);
  const [matches, setMatches] = useState<MatchResponse[]>([]);

  useEffect(() => {
    console.log("use effect!!")
    if (authInfo?.userInfo?.team) {
      void fetchTeam(authInfo.userInfo.team as string);
      void fetchMatches(authInfo.userInfo.team as string);
    }
  }, [authInfo.userInfo]);

  const fetchTeam = async (teamId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/team/${teamId}`, {headers: {Authorization: `Bearer ${authInfo.userToken}`}});
      if (!response.ok) {
        throw new Error(`Failed to fetch team: ${response.statusText}`);
      }

      const data: TeamResponse = await response.json();
      console.log("Fetched team data:", data);
      setTeam(data);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  const fetchMatches = async (teamId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/team/${teamId}/matches`, {headers: {Authorization: `Bearer ${authInfo.userToken}`}});
      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.statusText}`);
      }

      const data: MatchResponse[] = await response.json();
      setMatches(data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  if (!authInfo?.userInfo) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="player-page page">
      <Header />
      <div className="sidebar">
        <div className="sidebar__profile">
          <div className="sidebar__profile-pic"></div>
          <div className="sidebar__profile-name">
            {authInfo.userInfo.firstName} {authInfo.userInfo.lastName}
          </div>
          <div className="sidebar__profile-role">
            {authInfo.userInfo.role}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="team-members">
          <div className="team-members__header">My team</div>
          {team ? (
            <ul className="team-members__list">
              {team.players.map((player: UserResponse) => (
                <li key={player._id} className="team-members__item">
                  <div className="team-members__item-pic"></div>
                  <div className="team-members__item-info">
                    <div>{player.firstName}</div>
                    <div>{player.lastName}</div>
                    <div>{player.email}</div>
                    <div>{player.role}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading team members...</p>
          )}
        </div>
        <div className="matches">
          <div className="matches__header">Matches</div>
          {matches.length > 0 ? (
            <ul className="matches__list">
              {matches.map((match: MatchResponse) => (
                <li key={match._id} className="matches__item">
                  <div className="matches__item-info">
                    <div>{new Date(match.date).toLocaleDateString()}</div>
                    <div>{match.local.name} vs {match.visitor.name}</div>
                    <div>{match.localScore} - {match.visitorScore}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming matches. Stay tuned!</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlayerPage;
