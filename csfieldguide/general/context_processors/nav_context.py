from chapters.models import Chapter

def nav_context(context):
	return {'chapters': Chapter.objects.all()}