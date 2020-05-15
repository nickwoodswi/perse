const Workouts = [
    {
        id: 0,
        name: 'SELECT WORKOUT',
        sets: []
    },
    {
        id: 1,
        name: 'Arms',
        sets: [
            {
                exercise_type_id: 4,
                set_num: 4,
                rep_type: 'SET MULTIPLE',
                reps: 10,
                weight: 60,
                sub_distance: null,
                tempo_time: null,
                subrest_time: null,
                rest_time: 60
            },
            {
                exercise_type_id: 7,
                set_num: 1,
                rep_type: 'TO FAILURE',
                reps: null,
                weight: null,
                sub_distance: null,
                tempo_time: null,
                subrest_time: null,
                rest_time: 60
            },
            {
                exercise_type_id: 10,
                set_num: 4,
                rep_type: 'SET MULTIPLE',
                reps: 10,
                weight: 20,
                sub_distance: null,
                tempo_time: null,
                subrest_time: null,
                rest_time: 60
            },
            {
                exercise_type_id: 11,
                set_num: 4,
                rep_type: 'SET MULTIPLE',
                reps: 10,
                weight: 20,
                sub_distance: null,
                tempo_time: null,
                subrest_time: null,
                rest_time: null,
            }
        ]
      },
      {
        id: 2,
        name: 'Legs',
        sets: [
            {
                exercise_type_id: 2,
                set_num: 1,
                rep_type: 'SINGLE DISTANCE (m)',
                reps: 200,
                weight: 60,
                sub_distance: 50,
                tempo_time: null,
                subrest_time: 30,
                rest_time: 120
            },
            {
                exercise_type_id: 5,
                set_num: 1,
                rep_type: 'SET MULTIPLE',
                reps: 5,
                weight: null,
                sub_distance: 50,
                tempo_time: null,
                subrest_time: 30,
                rest_time: 120
            },
            {
                exercise_type_id: 8,
                set_num: 4,
                rep_type: 'SET MULTIPLE',
                reps: 10,
                weight: null,
                sub_distance: null,
                tempo_time: 1,
                subrest_time: null,
                rest_time: 120
            },
            {
                exercise_type_id: 8,
                set_num: 2,
                rep_type: 'TO FAILURE',
                reps: 10,
                weight: null,
                sub_distance: null,
                tempo_time: 1,
                subrest_time: 10,
                rest_time: null
            }
        ]
      },
      {
        id: 3,
        name: 'Core',
        sets: [
            {
                exercise_type_id: 3,
                set_num: 4,
                rep_type: 'SET MULTIPLE',
                reps: 30,
                weight: 10,
                sub_distance: null,
                tempo_time: 1,
                subrest_time: 30,
                rest_time: 60
            },
            {
                exercise_type_id: 7,
                set_num: 4,
                rep_type: 'SET MULTIPLE',
                reps: 15,
                weight: null,
                sub_distance: null,
                tempo_time: 1,
                subrest_time: 30,
                rest_time: 60
            },
            {
                exercise_type_id: 9,
                set_num: 4,
                rep_type: 'SET MULTIPLE',
                reps: 10,
                weight: null,
                sub_distance: null,
                tempo_time: null,
                subrest_time: 30,
                rest_time: null
            }
        ]
      },
      {
        id: 4,
        name: 'Cardio',
        sets: [
            {
                exercise_type_id: 5,
                set_num: 1,
                rep_type: 'SET MULTIPLE',
                reps: 4,
                weight: null,
                sub_distance: 20,
                tempo_time: 30,
                subrest_time: 30,
                rest_time: null
            },
            {
                exercise_type_id: 6,
                set_num: 1,
                rep_type: 'TIME (min)',
                reps: 30,
                weight: null,
                sub_distance: null,
                tempo_time: null,
                subrest_time: null,
                rest_time: null
            }
        ]
      },
      {
        id: 5,
        name: 'Exhaustion',
        sets: [
            {
                exercise_type_id: 6,
                set_num: 1,
                rep_type: 'TIME (min)',
                reps: 30,
                weight: 10,
                sub_distance: null,
                tempo_time: null,
                subrest_time: null,
                rest_time: null
            },
            {
                exercise_type_id: 3,
                set_num: 1,
                rep_type: 'TO FAILURE',
                reps: null,
                weight: 10,
                sub_distance: null,
                tempo_time: null,
                subrest_time: null,
                rest_time: null
            },
            {
                exercise_type_id: 9,
                set_num: 1,
                rep_type: 'SET MULTIPLE',
                reps: 10,
                weight: null,
                sub_distance: null,
                tempo_time: null,
                subrest_time: null,
                rest_time: null
            },
            {
                exercise_type_id: 4,
                set_num: 1,
                rep_type: 'SET MULTIPLE',
                reps: 4,
                weight: null,
                sub_distance: 20,
                tempo_time: 30,
                subrest_time: 30,
                rest_time: null
            },
            {
                exercise_type_id: 5,
                set_num: 1,
                rep_type: 'SET MULTIPLE',
                reps: 5,
                weight: null,
                sub_distance: 20,
                tempo_time: null,
                subrest_time: 10,
                rest_time: null
            }
        ]
      }
]

export default Workouts