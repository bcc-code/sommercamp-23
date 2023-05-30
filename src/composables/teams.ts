const teams = ['blue', 'yellow', 'green', 'purple'] as const;
const teamLeaders = ['Derek', 'Elena', 'Preben', 'Edith'] as const;

export type Team = typeof teams[number]

export const useTeams = () => {

    const teamName = (team: Team) => {
        switch (team) {
            case 'blue': return 'Blå/Blue'
            case 'yellow': return 'Gul/Yellow'
            case 'green': return 'Grønn/Green'
            case 'purple': return 'Lilla/Purple'
        }
    }

    return {
        teams,
        teamLeaders,
        teamName
    }
}