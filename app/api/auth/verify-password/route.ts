export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Check against admin password from environment
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
    
    return Response.json({
      valid: password === adminPassword,
    });
  } catch (error) {
    console.error('Error verifying password:', error);
    return Response.json(
      { error: 'Failed to verify password' },
      { status: 500 }
    );
  }
}
