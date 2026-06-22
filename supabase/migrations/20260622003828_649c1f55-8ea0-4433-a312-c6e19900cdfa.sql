
-- handle_new_user só é chamada pelo trigger (postgres owner) — revogar de todos os outros
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- has_role precisa ser executável dentro das policies RLS por anon e authenticated,
-- mas não deve aparecer como "executável por public implicitamente"
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated, service_role;

-- update_updated_at_column só é chamada por triggers
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
