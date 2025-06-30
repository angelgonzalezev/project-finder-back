export default `
SELECT
    p.id,
    p.title,
    p.description,
    p.status,
    p.published_at,
    p.creation_date,
    p.total_hours,
    p.total_applications_amount,

    jsonb_build_object(
        'id', o.id,
        'name', o.name,
        'logo', o.logo,
        'industry_id', o.industry_id
    ) AS organization,

    jsonb_build_object(
        'id', pl.id,
        'name', pl.name,
        'last_name', pl.last_name
    ) AS project_leader,

    jsonb_build_object(
        'hour_from', b.hour_from,
        'hour_to', b.hour_to,
        'total', b.total
    ) AS budget,

    jsonb_build_object(
        'id', c.id,
        'name', c.name
    ) AS category,

    jsonb_build_object(
        'id', sc.id,
        'name', sc.name,
        'category_id', sc.category_id
    ) AS subcategory,

    COALESCE((
        SELECT jsonb_agg(goal)
        FROM (
            SELECT goal FROM project_goals WHERE project_id = p.id
        ) g
    ), '[]') AS goals,

    COALESCE((
        SELECT jsonb_agg(jsonb_build_object('question', f.question, 'answer', f.answer))
        FROM project_faqs f WHERE f.project_id = p.id
    ), '[]') AS faqs,

    COALESCE((
        SELECT jsonb_agg(
            jsonb_build_object(
                'title', pos.title,
                'referral_bonus', pos.referral_bonus,
                'skills', (
                    SELECT jsonb_agg(s.name)
                    FROM position_skills ps
                    JOIN skills s ON s.id = ps.skill_id
                    WHERE ps.position_id = pos.id
                ),
                'specialties', (
                    SELECT jsonb_agg(sp.name)
                    FROM position_specialties psp
                    JOIN specialties sp ON sp.id = psp.specialty_id
                    WHERE psp.position_id = pos.id
                )
            )
        )
        FROM positions pos
        WHERE pos.project_id = p.id
    ), '[]') AS positions

FROM projects p
JOIN organizations o ON o.id = p.organization_id
JOIN project_leaders pl ON pl.id = p.project_leader_id
LEFT JOIN budgets b ON b.project_id = p.id
LEFT JOIN categories c ON c.id = p.category_id
LEFT JOIN subcategories sc ON sc.id = p.subcategory_id
WHERE p.id = $1;

`;
